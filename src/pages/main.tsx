/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { nanoid } from 'nanoid';
import { Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import styles from './main.module.scss';

interface TODO{
  id: string,
  label: string,
  state: boolean
}

function Main() {
  const [todoList, setTodoList] = useState<TODO[] | []>([]);
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.length > 0) {
      const newTODO : TODO = { id: nanoid(), label: input, state: false };
      const newState = [
        ...todoList,
        newTODO
      ];
      setTodoList(newState);
      setErrorMsg('');
      setInput('');
    } else {
      setErrorMsg('Please enter a TODO');
    }
  };

  const changeCheckBoxState = (position) => {
    const newState = [...todoList];
    newState[position].state = !newState[position].state;
    setTodoList(newState);
  };

  const deleteTODO = (position) => {
    const newState = [...todoList];
    newState.splice(position, 1);
    setTodoList(newState);
  };

  const clearCompleted = () => {
    const newState = [...todoList];
    const filterCompleted = newState.filter((todo) => todo.state === false);
    setTodoList(filterCompleted);
  };

  useEffect(() => {
    const initialState : TODO[] = [{ id: nanoid(), label: 'First TODO', state: false }];
    setTodoList(initialState);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>TODO List</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a new TODO</Form.Label>
            <Form.Control
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter TODO"
            />
          </Form.Group>
          {todoList.map((todo, index) => (
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
              key={todo.id}
            >
              <Row>
                <Col>
                  <Form.Check type="checkbox" label={todo.label} onChange={() => changeCheckBoxState(index)} />
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    type="button"
                    key={todo.id}
                    onClick={() => deleteTODO(index)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          ))}
          <Button className={styles.addButton} variant="primary" type="submit">
            Add
          </Button>
          <Button variant="secondary" onClick={() => clearCompleted()}>
            Clear Completed
          </Button>
          <p>{errorMsg}</p>
        </Form>
      </div>
    </div>
  );
}

export default Main;
