import { ImageData as data, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { BigNumber as EthersBN } from 'ethers';
import { INounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';

interface StandaloneNounProps {
  nounId: EthersBN;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  onLoadSeed?: (seed: INounSeed) => void;
}

const getNoun = (nounId: string | EthersBN, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `Noun ${id}`;
  const description = `Noun ${id} is a member of the Nouns DAO`;
  const { parts, background } = getNounData(seed);
  const image = `data:image/svg+xml;base64,${btoa(buildSVG(parts, data.palette, background))}`;

  return {
    name,
    description,
    image,
  };
};

const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  return <Noun imgPath={noun ? noun.image : ''} alt={noun ? noun.description : 'Noun'} />;
};

export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (
  props: StandaloneNounWithSeedProps,
) => {
  const { nounId, onLoadSeed } = props;

  const seed = useNounSeed(nounId);

  if (seed && nounId && onLoadSeed) {
    onLoadSeed(seed);

    const { image, description } = getNoun(nounId, seed);

    return <Noun imgPath={image} alt={description} />;
  } else {
    return <Noun imgPath="" alt="Noun" />;
  }
};

export default StandaloneNoun;
