export default function checkRole(user) {
    return user.roles.filter(a => a.name.toLowerCase().includes(user)).length === 1
}