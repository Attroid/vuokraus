import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ErrorText({ content }) {
  return (
    <InputGroup hasValidation className='mt-2'>
      <FormControl isInvalid={true} className='d-none' />
      <FormControl.Feedback type='invalid'>
        {content}
        <span className='invisible'>.</span>
      </FormControl.Feedback>
    </InputGroup>
  );
}
