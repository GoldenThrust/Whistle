'use client'

import { useState, useEffect } from 'react';
import { Check, RefreshCw, HelpCircle, ChevronRight } from 'lucide-react';

export default function Practice() {
  // Sample METAR codes for practice
  const metarExamples = [
    {
      raw: "KBOS 151954Z 32005KT 10SM FEW030 BKN100 21/14 A3002 RMK AO2 SLP168 T02060139",
      parts: {
        station: "KBOS",
        datetime: "151954Z",
        wind: "32005KT",
        visibility: "10SM",
        weather: "",
        clouds: "FEW030 BKN100",
        temperature: "21/14",
        altimeter: "A3002",
        remarks: "RMK AO2 SLP168 T02060139"
      },
      explanation: {
        station: "Boston Logan International Airport",
        datetime: "15th day of month, 19:54 UTC",
        wind: "Wind from 320° at 5 knots",
        visibility: "10 statute miles",
        weather: "No significant weather",
        clouds: "Few clouds at 3,000 feet, broken clouds at 10,000 feet",
        temperature: "Temperature 21°C, dew point 14°C",
        altimeter: "Altimeter setting 30.02 inches of mercury",
        remarks: "Automated station with precipitation sensor, sea level pressure 1016.8 hPa, temperature 20.6°C, dew point 13.9°C"
      }
    },
    {
      raw: "KJFK 231756Z 18015G25KT 3SM -RA BR BKN008 OVC015 18/17 A2970 RMK AO2 SLP056 T01780167",
      parts: {
        station: "KJFK",
        datetime: "231756Z",
        wind: "18015G25KT",
        visibility: "3SM",
        weather: "-RA BR",
        clouds: "BKN008 OVC015",
        temperature: "18/17",
        altimeter: "A2970",
        remarks: "RMK AO2 SLP056 T01780167"
      },
      explanation: {
        station: "New York John F. Kennedy International Airport",
        datetime: "23rd day of month, 17:56 UTC",
        wind: "Wind from 180° at 15 knots, gusting to 25 knots",
        visibility: "3 statute miles",
        weather: "Light rain and mist",
        clouds: "Broken clouds at 800 feet, overcast at 1,500 feet",
        temperature: "Temperature 18°C, dew point 17°C",
        altimeter: "Altimeter setting 29.70 inches of mercury",
        remarks: "Automated station with precipitation sensor, sea level pressure 1005.6 hPa, temperature 17.8°C, dew point 16.7°C"
      }
    },
    {
      raw: "KATL 011235Z 27012KT 1/2SM FG VV002 07/06 A3010 RMK AO2 SLP194 T00670061",
      parts: {
        station: "KATL",
        datetime: "011235Z",
        wind: "27012KT",
        visibility: "1/2SM",
        weather: "FG",
        clouds: "VV002",
        temperature: "07/06",
        altimeter: "A3010",
        remarks: "RMK AO2 SLP194 T00670061"
      },
      explanation: {
        station: "Atlanta Hartsfield-Jackson International Airport",
        datetime: "1st day of month, 12:35 UTC",
        wind: "Wind from 270° at 12 knots",
        visibility: "1/2 statute mile",
        weather: "Fog",
        clouds: "Vertical visibility 200 feet",
        temperature: "Temperature 7°C, dew point 6°C",
        altimeter: "Altimeter setting 30.10 inches of mercury",
        remarks: "Automated station with precipitation sensor, sea level pressure 1019.4 hPa, temperature 6.7°C, dew point 6.1°C"
      }
    }
  ];

  const [currentMetar, setCurrentMetar] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState({});
  const [allPartsCompleted, setAllPartsCompleted] = useState(false);

  const metarParts = [
    { key: "station", label: "Station Identifier" },
    { key: "datetime", label: "Date/Time" },
    { key: "wind", label: "Wind" },
    { key: "visibility", label: "Visibility" },
    { key: "weather", label: "Weather" },
    { key: "clouds", label: "Cloud Coverage" },
    { key: "temperature", label: "Temperature/Dew Point" },
    { key: "altimeter", label: "Altimeter" },
    { key: "remarks", label: "Remarks" }
  ];

  const handlePartSelection = (part) => {
    setSelectedPart(part);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleAnswerChange = (e) => {
    const answer = e.target.value;
    setUserAnswers({
      ...userAnswers,
      [selectedPart]: answer
    });
  };

  const checkAnswer = () => {
    if (!selectedPart) return;

    const correctAnswer = metarExamples[currentMetar].parts[selectedPart];
    const isCorrect = userAnswers[selectedPart]?.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    setIsAnswerCorrect({
      ...isAnswerCorrect,
      [selectedPart]: isCorrect
    });

    setShowExplanation(true);
  };

  const nextExample = () => {
    setCurrentMetar((prev) => (prev + 1) % metarExamples.length);
    setSelectedPart(null);
    setUserAnswers({});
    setShowExplanation(false);
    setShowHint(false);
    setIsAnswerCorrect({});
    setAllPartsCompleted(false);
  };

  useEffect(() => {
    // Check if all parts have been correctly answered
    if (Object.keys(isAnswerCorrect).length > 0) {
      const allCorrect = metarParts.every(part => isAnswerCorrect[part.key] === true);
      const allAttempted = metarParts.every(part => part.key in isAnswerCorrect);
      setAllPartsCompleted(allCorrect && allAttempted);
    }
  }, [isAnswerCorrect, metarParts]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">METAR Decoding Practice</h1>
      
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">METAR Code:</h2>
        <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700 font-mono text-lg">
          {metarExamples[currentMetar].raw}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <h3 className="text-lg font-medium mb-3">METAR Components:</h3>
          {metarParts.map((part) => (
            <button
              key={part.key}
              className={`w-full text-left p-2 rounded-md flex justify-between items-center ${
                selectedPart === part.key 
                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' 
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${isAnswerCorrect[part.key] ? 'border-l-4 border-green-500' : ''}`}
              onClick={() => handlePartSelection(part.key)}
            >
              <span>{part.label}</span>
              {isAnswerCorrect[part.key] && <Check size={16} className="text-green-500" />}
            </button>
          ))}

          <div className="pt-6">
            <button 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
              onClick={nextExample}
            >
              <RefreshCw size={16} />
              <span>Next METAR Example</span>
            </button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedPart ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Decode: {metarParts.find(p => p.key === selectedPart)?.label}</h3>
              
              <div className="flex items-start gap-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-md">
                  <p className="font-mono">{metarExamples[currentMetar].parts[selectedPart]}</p>
                </div>
                <button 
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => setShowHint(!showHint)}
                >
                  <HelpCircle size={20} />
                </button>
              </div>

              {showHint && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-sm">
                  <p className="font-medium">Hint:</p>
                  <p>Look at the format pattern for {metarParts.find(p => p.key === selectedPart)?.label} and try to identify each part.</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your interpretation:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={userAnswers[selectedPart] || ''}
                  onChange={handleAnswerChange}
                  placeholder={`Enter the meaning of ${metarExamples[currentMetar].parts[selectedPart]}`}
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  onClick={checkAnswer}
                >
                  Check Answer
                </button>
              </div>
              
              {showExplanation && (
                <div className={`p-4 rounded-md ${
                  isAnswerCorrect[selectedPart] 
                    ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
                    : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
                }`}>
                  <h4 className="font-medium mb-2">
                    {isAnswerCorrect[selectedPart] ? 'Correct!' : 'Not quite right'}
                  </h4>
                  <p>{metarExamples[currentMetar].explanation[selectedPart]}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg mb-4">Select a METAR component to decode</p>
                <ChevronRight className="inline-block animate-bounce text-blue-500" size={24} />
              </div>
            </div>
          )}
          
          {allPartsCompleted && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-lg mb-2">Congratulations!</h4>
              <p>{`You've successfully decoded all parts of this METAR. Try another example!`}</p>
              <button 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
                onClick={nextExample}
              >
                <RefreshCw size={16} />
                <span>Next METAR Example</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
