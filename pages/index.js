import {useState} from 'react';

import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
    const [userInput, setUserInput] = useState('');
    const [apiOutputSpanish, setApiOutputSpanish] = useState('');
    const [apiOutputPortuguese, setApiOutputPortuguese] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling openAI...");
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userInput}),
        });

        const data = await response.json();
        const {spanish, portuguese} = data;

        setApiOutputSpanish(spanish.text);
        setApiOutputPortuguese(portuguese.text);
        setIsGenerating(false);
    }

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    return (
        <div className="root">
            <Head>
                <title>GPT-3 Writer | buildspace</title>
            </Head>
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>Translate your song</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>Input your song lyrics here. We'll translate for you.</h2>
                    </div>
                </div>
            </div>
            <div className="prompt-container">
                <textarea
                    placeholder="start typing here"
                    className="prompt-box" value={userInput}
                    onChange={onUserChangedText}
                    rows={10}
                />
                <div className="prompt-buttons">
                    <button className="generate-button" role="button" onClick={callGenerateEndpoint}
                            disabled={isGenerating}>
                        <div className="generate">
                            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                        </div>
                    </button>
                </div>
            </div>
            {apiOutputSpanish && (
                <div className="output">
                    <div className="output-header-container">
                        <div className="output-header">
                            <h3>Output</h3>
                        </div>
                    </div>
                    <div className="translations">
                        <div className="output-content">
                            <p>{apiOutputSpanish}</p>
                        </div>
                        <div className="output-content">
                            <p>{apiOutputPortuguese}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="badge-container grow">
                <a
                    href="https://buildspace.so/builds/ai-writer"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="badge">
                        <Image src={buildspaceLogo} alt="buildspace logo"/>
                        <p>build with buildspace</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Home;
