
import supabase from "@/db_config/supabaseClient";
import Navbar from "@/components/Navbar";
import Link from "next/link";


export async function getServerSideProps() {
  const { data, error } = await supabase.from("users").select();

  if (error) {
    return { props: { err: "Failed to retrieve users" } };
  }

  if (data) {
    return { props: { users: data } };
  }
}


export default function Home(props) {

  return (
    <div className="wrapper">

      <Navbar />

      <div className="main">
        {props.err && <li>{props.err}</li>}
        {props.users && props.users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name} 
          <br />
          <Link href={{ pathname: '/update', query: { id: user.id, name: user.name, email: user.email } }}>Update</Link>
          <br />  
          <Link href={{ pathname: '/delete', query: { id: user.id, name: user.name, email: user.email } }}>Delete</Link>
        </p>
        ))}
      </div>

    </div>

  );
}
