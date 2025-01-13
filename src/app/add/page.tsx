import { getClient } from "@/apollo/server";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

const ADD_PERSON = gql`
  mutation AddPerson($name: String!) {
    addPerson(name: $name) {
      id
      name
    }
  }
`;

export default async function Page() {
  async function action(formData: FormData) {
    'use server';

    const name = formData.get("name");
    console.log('formData', formData, 'name', name);
    const client = getClient();
    await client.mutate({
      mutation: ADD_PERSON,
      variables: { name },
    });
  };

  return (
    <form action={action}>
      <label htmlFor="name">
        Add Name
        <input type="text" name="name" />
      </label>

      <button type="submit">Add person</button>
    </form>
  );
}
