import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useRouter } from 'next/router';
import axios from 'axios';

const tabs = [
  { eventKey: '/account', title: 'Omat ilmoitukset' },
  { eventKey: '/account/favourites', title: 'Suosikit' },
  { eventKey: '/account/info', title: 'Oma tili' },
];

function AccountTabs({ favoriteProductCount = 0 }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login');
    } catch (e) {
      console.log('logout failed:', e);
    }
  };

  const handleSelect = (key) => {
    if (key === '/logout') {
      return handleLogout();
    }

    router.push(key);
  };

  return (
    <Tabs
      id='account-tabs'
      className='mb-3'
      transition={false}
      onSelect={handleSelect}
      defaultActiveKey={router.pathname}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.eventKey}
          eventKey={tab.eventKey}
          tabClassName={`text-${
            tab.eventKey === router.pathname ? 'black' : 'danger'
          }`}
          title={
            tab.title +
            (tab.eventKey.includes('favourites')
              ? ` (${favoriteProductCount})`
              : '')
          }
        />
      ))}
      <Tab eventKey='/logout' tabClassName='text-black' title='Kirjaudu ulos' />
    </Tabs>
  );
}

export default AccountTabs;
