import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FooterColumn() {
  return (
    <>
      <hr className='mt-5' />

      <p className='px-4'>
        Vuokraus.fi on harjoitusmielessä rakennettu kokonaisuus. Sivusto
        jäljittelee suomalaista <Link href='https://www.tori.fi'>Tori.fi</Link>{' '}
        -palvelua.
      </p>
      <Row className='px-5 mt-5'>
        <Col>
          <div>Käytetyt teknologiat</div>
          <div>
            {[
              'NextJs',
              'ReactJs',
              'NodeJs',
              'ExpressJs',
              'PostgreSQL',
              'KnexJs',
              'Bootstrap',
            ].map((tech) => (
              <div key={tech} className='my-2'>
                <Link className='link-secondary py-1' href={tech}>
                  {tech}
                </Link>
              </div>
            ))}
          </div>
        </Col>
        <Col>
          <div>Linkit</div>
          <div>
            <div className='my-2'>
              <Link
                className='link-secondary py-1'
                href='https://www.github.com/attroid/vuokraus'
              >
                Github
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default FooterColumn;
