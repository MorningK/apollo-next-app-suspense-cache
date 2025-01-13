"use client";

import { gql, skipToken, useSuspenseQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const ALL_PEOPLE = gql`
  query AllPeople {
    people {
      id
      name
    }
  }
`;

export default function Names() {
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    setSkip(false);
  }, []);

  const { data } = useSuspenseQuery<{ people: { id: number; name: string }[] }>(
    ALL_PEOPLE,
    skip
      ? skipToken
      : {
          fetchPolicy: "cache-and-network",
        }
  );

  return (
    <ul>
      {data?.people.map((person) => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  );
}
