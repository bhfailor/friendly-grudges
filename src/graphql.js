export const ListGrudges = `
  query ListGrudges {
    listGrudges {
      items {
        id
        person
        deed
        avenged
      }
    }
  }
`;

export const DeleteGrudge = `
  mutation DeleteGrudge(
    $id: ID!
  ) {
    deleteGrudge(input: {
      id: $id
    }) {
      id
      person
      deed
      avenged
    }
  }
`;

export const SubscribeToRemovedGrudges = `
  subscription onDeleteGrudge {
    onDeleteGrudge {
      id
      person
      deed
      avenged
    }
  }
`;

export const CreateGrudge = `
  mutation CreateGrudge(
    $person: String!
    $deed: String!
    $avenged: Boolean!
  ) {
    createGrudge(input: {
      person: $person,
      deed: $deed,
      avenged: $avenged
    }) {
      id
      person
      deed
      avenged
    }
  }
`;

export const SubscribeToNewGrudges = `
  subscription onCreateGrudge {
    onCreateGrudge {
      id
      person
      deed
      avenged
    }
  }
`;

export const ToggleGrudge = `
  mutation ToggleGrudge(
    $id: ID!
    $avenged: Boolean
    $deed: String
    $person: String
  ) {
    updateGrudge(input: {
      id: $id
      avenged: $avenged
      deed: $deed
      person: $person
    }) {
      id
      person
      deed
      avenged
    }
  }
`;

export const SubscribeToToggledGrudges = `
  subscription onUpdateGrudge {
    onUpdateGrudge {
      id
      person
      deed
      avenged
    }
  }
`;
