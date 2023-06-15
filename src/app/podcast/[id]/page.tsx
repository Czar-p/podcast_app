"use client";
import { useAppSelector } from "@/store";
import { NextPage } from "next";
import styles from "./styles.module.scss";
import Link from "next/link";

const PodcastDetails: NextPage<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { episodeCount, episodes = {} } = useAppSelector(
    (state) => state.podcasts.podcastInfo[id]
  );
  return (
    <div className={styles["episodes-content"]}>
      <div className={styles["episodes-header"]}>
        {<h1>Episodes: {episodeCount} </h1>}
      </div>
      <div className={styles["episodes-list"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(episodes)
              .sort(
                (a, b) =>
                  new Date(episodes[b]?.publishDate).getTime() -
                  new Date(episodes[a]?.publishDate).getTime()
              )
              .map((key) => {
                const { title, publishDate, duration, episodeId, audioUrl } =
                  episodes[key];
                return (
                  <tr key={key}>
                    <td>
                      {audioUrl && episodeId ? (
                        <Link href={`/podcast/${id}/episode/${episodeId}`}>
                          {title}
                        </Link>
                      ) : (
                        title
                      )}
                    </td>
                    <td>{publishDate}</td>
                    <td>{duration}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PodcastDetails;
