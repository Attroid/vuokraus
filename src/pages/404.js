import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='mt-5'>
      <h1>Hups!</h1>
      <p className='m-0'>
        Hakemaasi sivua ei kovasta yrityksestä huolimatta löydy. Pahoittelut!
      </p>
      <p className='m-0'>
        Kerro <del>asiakaspalveluumme</del> virheestä tai jatka oikeaan{' '}
        <Link className='text-primary' href='https://www.tori.fi/'>
          Tori.fi
        </Link>{' '}
        -palveluun.
      </p>
    </div>
  );
}
