import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Modal } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { Notifications } from '../Notifications';
import useWindowDimensions from '../../utils/layout';
import { MenuOutlined } from '@ant-design/icons';
import { HowToBuyModal } from '../HowToBuyModal';
import {
  Cog,
  CurrentUserBadge,
  CurrentUserBadgeMobile,
} from '../CurrentUserBadge';
import { ConnectButton } from '@oyster/common';
import { MobileNavbar } from '../MobileNavbar';

const getDefaultLinkActions = (connected: boolean) => {
  return [
    <Link
      to={`/`}
      key={'explore'}
      className="border-l border-white flex justify-center items-center"
    >
      <Button className="app-btn">Explore Waves</Button>
    </Link>,
    <Link
      to={`/artworks`}
      key={'artwork'}
      className="border-l border-white flex justify-center items-center"
    >
      <Button className="app-btn">{connected ? 'My Items' : 'Artwork'}</Button>
    </Link>,
    <Link
      to={`/artists`}
      key={'artists'}
      className="border-l border-white flex justify-center items-center"
    >
      <Button className="app-btn">Creators</Button>
    </Link>,
  ];
};

const DefaultActions = ({ vertical = false }: { vertical?: boolean }) => {
  const { connected } = useWallet();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        width: '81%',
        justifyContent: 'space-between',
        height: '41px',
      }}
    >
      {getDefaultLinkActions(connected)}
    </div>
  );
};

export const MetaplexMenu = () => {
  const { width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { connected } = useWallet();

  if (width < 768)
    return (
      <>
        <Modal
          title={<img src={'/metaplex-logo.svg'} />}
          visible={isModalVisible}
          footer={null}
          className={'modal-box'}
          closeIcon={
            <img
              onClick={() => setIsModalVisible(false)}
              src={'/modals/close.svg'}
            />
          }
        >
          <div className="site-card-wrapper mobile-menu-modal">
            <Menu onClick={() => setIsModalVisible(false)}>
              {getDefaultLinkActions(connected).map((item, idx) => (
                <Menu.Item key={idx}>{item}</Menu.Item>
              ))}
            </Menu>
            <div className="actions">
              {!connected ? (
                <div className="actions-buttons">
                  <ConnectButton
                    onClick={() => setIsModalVisible(false)}
                    className="secondary-btn"
                  />
                  <HowToBuyModal
                    onClick={() => setIsModalVisible(false)}
                    buttonClassName="black-btn"
                  />
                </div>
              ) : (
                <>
                  <CurrentUserBadgeMobile
                    showBalance={false}
                    showAddress={true}
                    iconSize={24}
                    closeModal={() => {
                      setIsModalVisible(false);
                    }}
                  />
                  <Notifications />
                  <Cog />
                </>
              )}
            </div>
          </div>
        </Modal>
        <MenuOutlined
          onClick={() => setIsModalVisible(true)}
          style={{ fontSize: '1.4rem' }}
        />
      </>
    );

  return <DefaultActions />;
};

export const LogoLink = () => {
  return (
    <Link
      to={`/`}
      className="border-l border-white w-10 h-10 flex justify-center items-center"
    >
      <img
        className="ml-7 w-full h-full object-contain"
        src={'./img/logo.png'}
      />
    </Link>
  );
};

export const AppBar = () => {
  const { connected } = useWallet();
  return (
    <>
      <MobileNavbar />
      <div id="desktop-navbar">
        <div className="app-left w-1/2 flex justify-between">
          <LogoLink />
          &nbsp;&nbsp;&nbsp;
          <MetaplexMenu />
        </div>
        <div className="app-right">
          {!connected && (
            <HowToBuyModal buttonClassName="modal-button-default" />
          )}
          {!connected && (
            <ConnectButton style={{ height: 48 }} allowWalletChange />
          )}
          {connected && (
            <>
              <div className="pr-3 border-r border-white">
                <div className="app-right-border py-1 ">
                  <CurrentUserBadge
                    showBalance={false}
                    showAddress={true}
                    iconSize={24}
                  />
                </div>
              </div>
              {/* <Notifications /> */}
              {/* <Cog /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
