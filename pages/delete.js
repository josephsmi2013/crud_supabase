import { useRouter } from 'next/router';
import { useState } from "react"
import supabase from '@/db_config/supabaseClient';


export default function Delete(props) {
  const router = useRouter();
  const id = router.query.id;
  const name = router.query.name;
  const email =router.query.email;
  const [err, setErr] = useState(null);

  const handleDelete = async () => {
    const {data, error} = await supabase
    .from('users')
    .delete()
    .eq('id', id)
    .select()

    if(error){
      setErr(error)
    }

    if(data){
      setErr(null)
      router.push('/')
    }
  }

  return (
    <div className="wrapper">
      {err && err.message}
      <form>
        <label>User's Name: </label>
        <p className="displayName">{name}</p>
        <br />

        <label>User's Email: </label>
        <p className="displayName">{email}</p>

        <br /><br />
        <button type="submit" onClick={handleDelete}>Delete User</button>
      </form>
    </div>

  )
}
