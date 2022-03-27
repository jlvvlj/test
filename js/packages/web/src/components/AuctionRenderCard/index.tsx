import React from 'react';
import { Card, CardProps } from 'antd';
import { ArtContent } from '../ArtContent';
import { AuctionView, useArt, useCreators } from '../../hooks';
import { AmountLabel } from '../AmountLabel';
// import { MetaAvatar } from '../MetaAvatar';
import { AuctionCountdown } from '../AuctionNumbers';

import { useAuctionStatus } from './hooks/useAuctionStatus';
import { useTokenList } from '../../contexts/tokenList';

export interface AuctionCard extends CardProps {
  auctionView: AuctionView;
}

export const AuctionRenderCard = (props: AuctionCard) => {
  const { auctionView } = props;
  const id = auctionView.thumbnail.metadata.pubkey;
  const art = useArt(id);
  const creators = useCreators(auctionView);
  const name = art?.title || ' ';

  const tokenInfo = useTokenList().subscribedTokens.filter(
    m => m.address == auctionView.auction.info.tokenMint,
  )[0];
  const { status, amount } = useAuctionStatus(auctionView);

  const card = (
    <Card hoverable={true} className={`auction-render-card`} bordered={false}>
      <div className={'card-art-info p-3'}>
        {/* <div className={'card-artist-info'}>
            <MetaAvatar
              creators={creators.length ? [creators[0]] : undefined}
            />
            <span className={'artist-name'}>
              {creators[0]?.name ||
                creators[0]?.address?.substr(0, 6) ||
                'Go to auction'}
              ...
            </span>
          </div> */}
        <div className={'art-content-wrapper'}>
          <ArtContent
            className="auction-image no-events"
            preview={false}
            pubkey={id}
            allowMeshRender={false}
          />
        </div>
        <div className="flex justify-between items-start h-20 mt-2">
          <div className="border-l border-white w-full h-full pl-3">
            <div className={'art-name'}>{name}</div>
            <div className="flex justify-center items-center app-right-border rounded-xl w-max p-1 mt-3">
              Go to aucition.
            </div>
          </div>
          <div className="flex justify-between items-start border-l border-white w-full">
            <div className="card-bid-info">
              <span className={'text-uppercase info-message'}>{status}</span>
              <AmountLabel
                containerStyle={{ flexDirection: 'row' }}
                title={status}
                amount={amount}
                iconSize={24}
                tokenInfo={tokenInfo}
              />
            </div>
            {!auctionView.isInstantSale && (
              <div className="auction-info-container">
                <div className={'info-message pt-1.5 mb-2'}>ENDING IN</div>
                <AuctionCountdown auctionView={auctionView} labels={false} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return card;
};
