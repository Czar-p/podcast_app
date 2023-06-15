"use client";
import crypto from "crypto-js";
import { Buffer } from "buffer";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
});

export const generateId = (value: string) => {
  const hashValue = crypto.SHA256(value).toString();

  const id = Buffer.from(hashValue, "hex")
    .toString()
    .replace(/[^\w]/g, "")
    .toLowerCase();

  return id.substring(0, 8);
};

export const formatSecondsToHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemainder = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secondsRemainder.toString().padStart(2, "0")}`;
};

export const parseXmlData = (xml: string) => {
  const parsedData = parser.parse(xml, {
    allowBooleanAttributes: true,
  }).rss.channel;

  return parsedData;
};
