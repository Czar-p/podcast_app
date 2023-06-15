export interface IPodcast {
  id: string;
  title: string;
  image: {
    source: string;
    attributes: {
      height: number;
    };
  };
  artist: string;
}

interface IEpisode {
  episodeId: string;
  title: string;
  publishDate: string;
  duration: string;
  description: string;
  audioUrl?: string;
}

export interface IEpisodes {
  [key: IEpisode["episodeId"]]: IEpisode;
}

export interface IPodcastInfo extends Omit<IPodcast, "image"> {
  image: string;
  description: string;
  episodeCount: number;
  episodes: IEpisodes;
}

export interface IPodcastState {
  loading: boolean;
  error: string | null;
  data: IPodcast[];
  podcastInfo: {
    [key: IPodcast["id"]]: IPodcastInfo;
  };
  currentPodcastId: IPodcast["id"];
}
