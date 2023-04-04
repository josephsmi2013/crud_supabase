import { useState } from "react"
import { useRouter } from "next/router";
import supabase from "@/db_config/supabaseClient"

export default function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name || !email) {
      setErr('Name and Email are required')    
      return
    }

    const {data, error} = await supabase
    .from('users')
    .insert([{name, email}])
    .select()

    if (error){
      setErr('Failed to create new user')
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
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value) } />
        <br />

        <label>User's Email: </label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value) } />

        <br /><br />
        <button type="submit" onClick={handleSubmit} my={2}>Create User</button>
        {err && <p>{err}</p>}
      </form>
    </div>

  )
}
