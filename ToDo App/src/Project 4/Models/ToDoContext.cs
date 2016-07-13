using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Storage;

namespace Project_4.Models
{
    public class ToDoContext :IdentityDbContext<ToDoUser>
    {
        public ToDoContext()
        {
            Database.EnsureCreated();
        }
        public DbSet<ToDo> ToDos { get; set; }

        public DbSet<Requirement> Requirements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:ToDoAppConnectionString"];
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
