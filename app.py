from flask import Flask, jsonify
import pyaudio
from numpy import zeros, linspace, short, fromstring, hstack, transpose, log, log2
from scipy.fft import fft
import time
import sys
from flask import Flask, render_template
from flask_socketio import SocketIO, emit




app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# WebSocket route for live audio streaming
@socketio.on('audio_stream')
def handle_audio_stream(audio_data):
    # Process the audio_data with your Tuner class here
    # For example, let's say you process it and get a response
    response = process_audio(audio_data)  # Implement this function based on your Tuner class
    
    # Emit the response back to the client
    emit('tuning_result', response)

def process_audio(audio_data):
    # Placeholder for your Tuner class processing
    # Return a response based on the processed audio data
    return "Processed audio data response"


@app.route('/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)


#!/usr/bin/env python
# adapted from https://github.com/katrinamo/RPiPitch/blob/master/freqDetect.py




class Values():
    # Volume Sensitivity, 0.01: Extremely Sensitive, may give false alarms
    # 0.1: Probably Ideal volume
    # 1: Poorly sensitive, will only go off for relatively loud sounds
    SENSITIVITY = 0.1
    TONE = 300  # Bandwidth to eliminate noise
    BANDWIDTH = 30
    RELATIVE_FREQ = 440.0
    NUM_SAMPLES = 2048
    SAMPLING_RATE = 44100

    MIN_INTENSITY = 5 # intensity below which input is ignored
    PRECISION = 0.8 # number of Hertz to allow either side of a note


class NotesHz(): # Notes in Hertz
    E2 = 84.2
    A2 = 108.32 # 0.5
    D3 = 149.55 # 0.75
    G3 = 194.3 # 0.5
    B = 246.72 # 0.75 TODO make more precise
    E4 = 326.5

class Tuner():
    IN_TUNE = 0
    FLAT = -1
    SHARP = 1

    def __init__(self):
        pa = pyaudio.PyAudio()
        self.stream = pa.open(
            format=pyaudio.paInt16, 
            channels=1, 
            rate=Values.SAMPLING_RATE,
            input=True, 
            frames_per_buffer=Values.NUM_SAMPLES
        )

    def get_frequency_from_samples(self, audio_data):
        # Each data point is a signed 16 bit number, so we can normalize by dividing by 32768 (2^15)
        normalized_data = audio_data / 32768.0
        intensity = abs(fft(normalized_data))[:Values.NUM_SAMPLES//2]
        frequencies = linspace(0.0, float(Values.SAMPLING_RATE)//2, num=Values.NUM_SAMPLES//2)

        max_intensity_index = intensity[1:].argmax() + 1
        # Use quadratic interpolation around the max
        if max_intensity_index != len(intensity)-1:
            y0, y1, y2 = log(intensity[max_intensity_index-1:max_intensity_index+2:])
            x1 = (y2 - y0) * 0.5 / (2 * y1 - y2 - y0)
            # find the frequency and output it
            thefreq = (max_intensity_index+x1)*Values.SAMPLING_RATE/Values.NUM_SAMPLES
        else:
            thefreq = max_intensity_index*Values.SAMPLING_RATE/Values.NUM_SAMPLES

        theintensity = intensity[max_intensity_index]

        #print("The freq is %f Hz." % (thefreq))

        if thefreq == -9999:
            return None, theintensity
        else:
            return thefreq, theintensity

    def get_adjusted_frequency(self, frequency):
        adjfreq = 1200 * log2(Values.RELATIVE_FREQ/frequency)/100
        adjfreq = adjfreq % 12

        return adjfreq

    def filter_resonant_frequency(self, frequency, note):
        # return frequency

        # if note < 95:
            # frequency /= 2

        if frequency > 1.5*note:
            frequency = None

        return frequency


    def listen(self, note=NotesHz):
        num_samples = 5
        frequency = 0
        for i in range(num_samples):
            while self.stream.get_read_available() < Values.NUM_SAMPLES:
                time.sleep(0.01)

            audio_data = fromstring(
                self.stream.read(
                    self.stream.get_read_available(), 
                    exception_on_overflow=False
                    ), 
                    dtype=short
                )[-Values.NUM_SAMPLES:]

            freq, intensity = self.get_frequency_from_samples(audio_data)
            freq = self.filter_resonant_frequency(freq, note)
            if intensity < Values.MIN_INTENSITY or freq==None:
                return None, None
            else:
                frequency += freq
        
        frequency /= num_samples

        if frequency != None and intensity > Values.MIN_INTENSITY:
            # In Tune
            if abs(frequency - note) <= Values.PRECISION:
                return self.IN_TUNE, frequency
                
            # Flat
            elif (frequency - note) < -Values.PRECISION:
                return self.FLAT, frequency

            # Sharp
            elif (frequency - note) > Values.PRECISION:
                return self.SHARP, frequency
        else:
            return None, None



    def tune_to(self, note=NotesHz, tuningFunction=lambda x: None, stopInTune=True, collectSamples=0):
        samples = [None, None, None, None, None] # stores 5 previous notes (IN_TUNE/SHARP/FLAT)
        i = 0

        messages = {Tuner.IN_TUNE: " IN_TUNE ",
                Tuner.SHARP:   " SHARP   ",
                Tuner.FLAT:    " FLAT    "}

        while True:
            in_tune, frequency = self.listen(note)

            if None not in (in_tune, frequency):
                IN_TUNE_TO_MOTOR = {0: 0, -1: 1, 1:10}

                tuningFunction(IN_TUNE_TO_MOTOR[in_tune])
                if not collectSamples:
                    print(f"{note_name} string is {messages[in_tune]} (should be {note} | {frequency:>3.2f})")
                #print(f"{frequency:>3.2f}")
                samples[i%5] = in_tune
                i += 1

                if samples.count(self.IN_TUNE) >= 4 and stopInTune:
                    return True
                elif collectSamples:
                    print(frequency)
                    if i >= collectSamples:
                        return False

            else: # No note heard
                pass

            time.sleep(0.02)


if __name__ == "__main__":
    # motors = tuning_motors.Motors()
    # motor = motors.create_motor(18, 40)

    # motor.turn_peg(0.5, tuning_motors.ACLOCKWISE)


    tuner = Tuner()

    note_names = {
            "E2": NotesHz.E2,
            "A2": NotesHz.A2,
            "D3": NotesHz.D3,
            "G3": NotesHz.G3,
            "B": NotesHz.B,
            "E4": NotesHz.E4
        }

    note_name = sys.argv[1]

    note = note_names[note_name]

    if tuner.tune_to(note, stopInTune=True, tuningFunction=lambda x: motor.turn_peg(0.5, x)):
        print(f"{note_name} string is in tune!")

    for note_name in list(note_names.keys()):
        input(f"Collect samples for {note_name} [ENTER]")
        note = note_names[note_name]

        if tuner.tune_to(note, stopInTune=False, tuningFunction=lambda x: motor.turn_peg(0.5, x)):
            print(f"{note_name} string is in tune!")
        else:
            print()

