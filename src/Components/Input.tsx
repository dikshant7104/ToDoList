import { useState } from 'react';
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

  const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
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
            onChange={valueChange}
          />
          <Button type="submit" className="sub_button" color="primary">
            <CgSandClock />
          </Button>
        </form>
      </div>
    </>
  );
};
