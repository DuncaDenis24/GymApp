using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;

namespace GYMBD
{
    public class GymUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
       
    }
    class BdContext : DbContext
    {
        public DbSet<GymUser> GymUsers { get; set; }
        public BdContext() : base("DefaultConnection")
        {
        }
        



        class Program
        {

            static void Main(string[] args)
            {

                //AddUser();
                // ShowUsers();
                // DeleteUser(2);
                 UpdateUser(7);
                Console.ReadKey();
            }

            private static void AddUser()
            {
                
                    var db = new GYMBD.BdContext();
                    var gymuser = new GymUser
                    {
                        Id = 1,
                        Name = "Johnny",
                        Surname = "Doreel",
                        Email = "bendr",
                        Password = "122ni33",
                        Phone = "4502016"
                    };
                    db.GymUsers.Add(gymuser);
                    db.SaveChanges();
                
            }
            private static void ShowUsers()
            {
                var db = new GYMBD.BdContext();
                foreach (var user in db.GymUsers)
                {
                    Console.WriteLine(user.Name);
                }
            }
            private static void DeleteUser(int id)
            {
                var db = new GYMBD.BdContext();
                var user = db.GymUsers.FirstOrDefault(u => u.Id == id);
                    db.GymUsers.Remove(user);
                db.SaveChanges();
            }
            private static void UpdateUser(int id)
            {
                var db = new GYMBD.BdContext();
                var user = db.GymUsers.FirstOrDefault(u => u.Id == id);
               
                user.Name = "Dinis";
                user.Surname = "Bota";
                user.Password = "parola";
                user.Phone="nimic";

                db.SaveChanges();
            }
        }
    }
}
