import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const StudentInput = ({assessment, studentId, enrollState}) => {
  const [inputState, setInputState]=useState('');
  const [gptState, setGptState]=useState('');
  const [previousState, setPreviousState] = useState(null);
  const isEnrolled = JSON.parse(enrollState)

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
    const scoreMatch = answer.match(scoreRegex);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
    
    const createInput = {
        student: studentId,
        assessment: assessment.id,
        input: inputState,
        score: score, 
        explanation: gptState
    }

    const updateInput = {
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

    const studentScores = assessment.scores.filter((score) => score.student === studentId);

    if(studentScores.length===0) {
        const response = await fetch(`http://127.0.0.1:8000/assessments/${assessment.id}/score/`, options);
        const data= await response.json();
        console.log(data)
        window.location.reload();
    } else {
        const previousScoreId= studentScores[0].id;
        const updateOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateInput),
          };
          const response = await fetch(`http://127.0.0.1:8000/score/${previousScoreId}/update/`, updateOptions);
            const data = await response.json();
            console.log(data);
            window.location.reload();
    }

  }

  const studentScores = assessment.scores.filter((score) => score.student === studentId);

  console.log("🥸",isEnrolled)
  const studentAns = studentScores.map((score)=> (
    <div
      key={score.id}
      style={{ boxShadow: '0 0 5px', borderRadius: '1em', padding: '5px' }}
    >
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>Your Answer: {score.input}</li>
        <br></br>
        <li>{score.explanation}</li>
      </ul>
    </div>
  ))

  return (
    <div>
        <div>
           {studentAns}
        </div>
        {isEnrolled? 
                (<><Form onSubmit = {checkScore}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label></Form.Label>
                      <Form.Control 
                      as="textarea" 
                      rows={3}
                      value={inputState}
                      onChange = {(e) => onChangeHandler(e, setInputState)} />
                  </Form.Group>
                  <div className="mb-2">
                      <Button variant="warning" size="sm" type = "submit">
                          AI Score
                      </Button>
                  </div>
              </Form></>):(<div style={{color:'red'}}>Please enroll to answer question</div>)}

      
        {gptState? (
        <div style={{backgroundColor:'lightgray', border:'5px lightgray solid', borderRadius:'1em'}}>
            <div> {gptState} </div>
            <div className='d-grid'>
            <Button variant="warning" size="sm" onClick={handleSubmit}>
            {assessment.scores.filter((score) => score.student === studentId).length === 0
                ? 'Submit'
                : 'Resubmit'}
            </Button>
            </div>
        </div>):
        (<></>)}

    </div>
  )
}

export default StudentInput