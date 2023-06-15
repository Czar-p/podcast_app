"use client";
import { proxyUrl } from ".";
import { formatSecondsToHours, generateId, parseXmlData } from "../../../utils";
import { IEpisodes, IPodcast, IPodcastInfo } from "../interfaces";

export const getPodcastsTransform = (data: any): IPodcast[] => {
  console.log(data?.feed?.entry[0], "TESSST");
  return data?.feed?.entry.map((entry: any) => ({
    id: Number(entry.id.attributes["im:id"]),
    title: entry["im:name"].label,
    image: {
      source: entry["im:image"][2].label,
      attributes: entry["im:image"][2].attributes,
    },
    artist: entry["im:artist"].label,
  }));
};

export const getPodcastTransform = async (data: any): Promise<IPodcastInfo> => {
  const podcastInfo = data?.results[0];
  const title = podcastInfo.collectionName;
  const artist = podcastInfo.artistName;
  const image = podcastInfo.artworkUrl600;
  const id = podcastInfo.collectionId;

  const xml = await fetch(proxyUrl + podcastInfo.feedUrl);
  const xmlData = await xml.text();
  const parsedData = parseXmlData(xmlData);
  const description = parsedData.description;
  const episodeCount = parsedData.item.length;

  const episodes: IEpisodes = {};
  parsedData.item
    .sort(
      (a: any, b: any) =>
        new Date(b?.pubDate).getTime() - new Date(a?.pubDate).getTime()
    )
    .forEach((ep: any) => {
      const metadata = {
        title: ep?.title,
        publishDate: new Date(ep?.pubDate).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }),
        duration: Number.isInteger(ep["itunes:duration"])
          ? formatSecondsToHours(ep["itunes:duration"])
          : ep["itunes:duration"],
        description: ep?.description,
        audioUrl: ep.enclosure && ep.enclosure["@_url"],
      };
      const episodeId = generateId(
        JSON.stringify(ep.guid["#text"] ?? metadata)
      );
      episodes[episodeId] = { ...metadata, episodeId };
    });

  const details: IPodcastInfo = {
    id,
    title,
    artist,
    description,
    image,
    episodes,
    episodeCount,
  };
  return details;
};
