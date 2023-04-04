import { useRouter } from 'next/router';
import { useState } from "react"
import supabase from '@/db_config/supabaseClient';


export default function Create(props) {
  const router = useRouter();
  const id = router.query.id;
  const [name, setName] = useState(router.query.name);
  const [email, setEmail] = useState(router.query.email);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {data, error} = await supabase
    .from('users')
    .update({name, email})
    .eq('id', id)
    .select()
  
    if(error){
      setErr('Unable to update the user')
      return
    }
  
    if(data){
      setErr(null)
      router.push('/')
    }
  }

  
  return (
    <div className="wrapper">
      <form>
        <label>User's Name: </label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value) }/>
        <br />

        <label>User's Email: </label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value) } />

        <br /><br />
        <button type="submit" onClick={handleSubmit}>Update User</button>
      </form>
      {err && err.message}
    </div>

  )
}
