import Link from 'next/link';

function ProductsNotFound({ show }) {
  if (show !== true) {
    return null;
  }

  return (
    <div className='mt-5 border bg-light p-3'>
      <h2 className='fs-5 fw-bold'>Ilmoituksia ei löytynyt</h2>
      <p className='m-0 mt-4'>Oletko jo kokeillut...</p>
      <ul>
        <li>
          Käytä yleisiä hakusanoja, esim <b>paita</b>
        </li>
        <li>
          Siirry käyttämään oikeaa{' '}
          <Link href='https://www.tori.fi/'>tori.fi</Link> -palvelua
        </li>
      </ul>
    </div>
  );
}

export default ProductsNotFound;
