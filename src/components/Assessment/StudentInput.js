import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const StudentInput = ({assessment}) => {
  const [inputState, setInputState]=useState('');
  const [gptState, setGptState]=useState('');
  const [submitState, setSubmitState]=useState('');

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  }
  const checkScore = async(event) => {
    event.preventDefault();
    const createAICheck= {
        question:assessment.question,
        answer:inputState
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createAICheck)
    };
    const response = await fetch(`http://127.0.0.1:8000/aiscore/`, options);
    const data= await response.json();
    setGptState(data)
    

  }
  const handleSubmit = async(event) =>{
    event.preventDefault();
    const answer = gptState
    const scoreRegex = /Score:\s+(\d+)/;
    console.log("😇",scoreRegex)
    const scoreMatch = answer.match(scoreRegex);
    console.log("😆", scoreMatch)
    const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
    console.log("🤓", score)
    const createInput = {
        student: 1,
        assessment: assessment.id,
        input: inputState,
        score: score, 
        explanation: gptState
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createInput)
    };
    const response = await fetch(`http://127.0.0.1:8000/assessments/${assessment.id}/score/`, options);
    const data= await response.json();
    console.log(data)
    setSubmitState(data)
  }
  return (
    <div>
        <Form onSubmit = {checkScore}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label></Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3}
                value={inputState}
                onChange = {(e) => onChangeHandler(e, setInputState)} />
            </Form.Group>
            <div className="mb-2">
                <Button variant="secondary" size="lg" type = "submit">
                    check with AI
                </Button>
            </div>
        </Form>
        <Button variant="secondary" size="lg" onClick={handleSubmit}>
                    Submit
                </Button>
        <div>
        {assessment.scores.map((score) => (
            <>
            
              <li key={score.id}>{score.score}</li>
              {score.input}
              {score.explanation}
              </>
            ))}
        </div>
        {submitState? (<div>
            Score: {submitState.score} Explanation: {submitState.explanation}
        </div>):
        (<></>)}
        
        {gptState? (<div>
            {gptState}
        </div>):
        (<></>)}
    </div>
  )
}

export default StudentInput