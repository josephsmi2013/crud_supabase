import supabase from "@/db_config/supabaseClient";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";


export default function UserCard({user}) {
  const router = useRouter();

  const handleEdit = (id, name) => {
    router.push({
      pathname: "/edit" + id, 
      query:{ id: id, name: name}
    },"/edit" + id)
  }
  const handleDelete = async (id) => {
    const {data, error} = await supabase
    .from('Users')
    .delete()
    .eq('id', id)
    .select()

    if(data){
      router.reload()
    }
  }

  return (

    <Card variant="elevated" as="Card" m={5} minW="175px" overflow="hidden">
        <CardHeader as="CardHeader" pb={2}>
            <Heading size='md'>{user.name}</Heading>
            <Heading size='md'>$ {user.budget_cy}</Heading>
        </CardHeader>

        <CardBody as="CardBody" p={0} pl={4}>
            <Text pt='2' fontSize='sm'>{user.email}</Text>
        </CardBody>
        <Divider />
        <CardFooter py={2}>
          <SimpleGrid columns={2} columnGap={0} w="full">
            <GridItem colspan={1}>
              <Button variant='ghost' colorScheme='blue' onClick={(e) => handleEdit(user.id, user.name)}>
                Edit
              </Button>
            </GridItem>
            <GridItem colspan={1} colStart={2}>
              <Button variant='ghost' colorScheme='blue'>
                Send
              </Button>
            </GridItem>
            <GridItem colStart={1} colEnd={3}>
              <Button variant="outline" colorScheme="red" size="xs" width="full" onClick={(e) => handleDelete(user.id)}>
                Delete
              </Button>
            </GridItem>
          </SimpleGrid>
        </CardFooter>
    </Card>

  )
}
