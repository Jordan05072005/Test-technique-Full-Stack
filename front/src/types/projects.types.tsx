import { Dispatch, SetStateAction } from "react";

export type ProjectType = {
  _id?: string;
  title: string;
  description: string;
};

export type FormType = {
  name: string;
  val: string;
  set: (value: string) => void;
};

export type Field<ProjectType> = {
  name: string;
  val: string;
  set: Dispatch<SetStateAction<ProjectType>>;
};