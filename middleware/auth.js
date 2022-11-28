export default function ({ store, redirect }) {
    if (!store.state.user.user) return redirect("/login");//no funciona con el método de firebase porque no da a tiempo a que se termine el proceso
}