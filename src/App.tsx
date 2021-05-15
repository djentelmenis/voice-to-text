import { useState } from "react";
import classNames from "classnames";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import mic from "./mic.svg";
import down from "./down.svg";

import "./App.css";

enum LanguageCode {
  ENGLISH_UNITED_STATES = "en-US",
  ENGLISH_GREAT_BRITAIN = "en-GB",
  NORWEGIAN = "no-NO",
  SWEDISH = "sv-SE",
  DANISH = "da",
  FINNISH = "fi",
  LATVIAN = "lv",
  RUSSIAN = "ru",
}

interface LanguageOption {
  label: string;
  code: LanguageCode;
}

const languages: LanguageOption[] = [
  { label: "English US", code: LanguageCode.ENGLISH_UNITED_STATES },
  { label: "English UK", code: LanguageCode.ENGLISH_GREAT_BRITAIN },
  { label: "Norwegian", code: LanguageCode.NORWEGIAN },
  { label: "Swedish", code: LanguageCode.SWEDISH },
  { label: "Danish", code: LanguageCode.DANISH },
  { label: "Finnish", code: LanguageCode.FINNISH },
  { label: "Latvian", code: LanguageCode.LATVIAN },
  { label: "Russian", code: LanguageCode.RUSSIAN },
];

const App = () => {
  const [language, setLanguage] = useState<LanguageCode>(
    LanguageCode.ENGLISH_UNITED_STATES
  );

  const { transcript, resetTranscript, listening } = useSpeechRecognition({
    clearTranscriptOnListen: false,
  });

  const handleClickRecording = async () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      await SpeechRecognition.startListening({ language: language });
    }
  };

  const handleResetTranscript = () => resetTranscript();

  const isSupported = SpeechRecognition.browserSupportsSpeechRecognition();

  return (
    <div id="App">
      {isSupported ? (
        <>
          <div id="Transcript">
            <p>{transcript}</p>
            {transcript && (
              <button id="Clear" onClick={handleResetTranscript}>
                Clear text
              </button>
            )}
          </div>
          <div id="Controls">
            <div id="MicWrapper">
              <img src={mic} id="Mic" alt="press to record" />
              <button
                className={classNames("Border", {
                  Active: listening,
                })}
                onClick={handleClickRecording}
              />
            </div>
            <div>
              <label htmlFor="Language">Language:</label>
              <select
                name="Language"
                id="Language"
                onChange={(event) =>
                  setLanguage(event.target.value as LanguageCode)
                }
                style={{
                  backgroundImage: `url(${down})`,
                }}
              >
                {languages.map((language) => (
                  <option
                    className="LanguageOption"
                    key={language.label}
                    value={language.code}
                  >
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        <p>Sorry, your browser isn't supported</p>
      )}
    </div>
  );
};

export default App;
