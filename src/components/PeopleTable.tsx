import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

interface Props {
  setLoading: (setLoading: boolean) => void;
}

export const PeopleTable: React.FC<Props> = ({ setLoading }) => {
  const [users, setUsers] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await getPeople();

        setUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        setError('Error');
      }
    };

    fetchPersons();
  }, [setLoading]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {users.map(person => (
          <tr data-cy="person" key={person.name}>
            <td>
              <a href={`#/people/${person.name.toLowerCase()}`}>
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {' '}
              {person.motherName ? (
                <a href={`#/people/${person.mother?.slug}`}>
                  {person.motherName}
                </a>
              ) : (
                '-'
              )}
            </td>
            <td>
              {' '}
              {person.fatherName ? (
                <a href={`#/people/${person.father?.slug}`}>
                  {person.fatherName}
                </a>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};