import { LogoutButton, VerifyEmailButton } from '@/components';
import { getUser, listDocuments } from '@/lib';

export default async function Dashboard() {
  // Examples of how to use the authentication and database functions
  const user = await getUser();
  const { documents } = await listDocuments('test');

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Example of how to display user information, in this case, if the user is not verified, display a button to send an email to verify their account */}
      {user?.emailVerification ? (
        <p>Your email is verified</p>
      ) : (
        <p className="flex flex-col gap-2 w-fit">
          Your email is not verified
          <VerifyEmailButton />
        </p>
      )}

      {/* Example of how to display the documents from a collection */}
      <div className="overflow-x-auto border rounded-md">
        <table>
          <thead>
            <tr className="font-bold">
              {Object.keys(documents[0] ?? {}).map(key => (
                <th className="border-x p-2 font-bold bg-muted" key={key}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {documents.map(doc => (
              <tr key={doc.$id} className="border-y-2">
                {Object.values(doc).map(value => (
                  <td
                    key={value + Math.random() * 1000}
                    className="border-x-2 p-2 text-nowrap"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
