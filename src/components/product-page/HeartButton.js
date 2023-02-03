import Button from 'react-bootstrap/Button';

export default function HeartButton({ onClick, active }) {
  return (
    <Button className='p-0 bg-white border-0' onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        fill={active ? '#dc3545' : 'grey'}
        viewBox='0 0 16 16'
      >
        <path
          fill-rule='evenodd'
          d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
        />
      </svg>
    </Button>
  );
}
