import React, { useState } from 'react';
import './styles.css';
import { Button } from 'reactstrap';
import { CgSandClock } from 'react-icons/cg';
import { addTodoAction, type Actions } from './Reducer';

interface Props {
  // todos: string;
  dispatch: (action: Actions) => void;
}
export const InputData = ({ dispatch }: Props) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodoAction(input));
      setInput('');
    }
  };
  return (
    <>
      <div>
        <form action="" className="input" onSubmit={handleSubmit}>
          <input
            type="input"
            placeholder="Enter your task"
            className="input_field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" className="sub_button" color="primary">
            <CgSandClock />
          </Button>
        </form>
      </div>
    </>
  );
};
