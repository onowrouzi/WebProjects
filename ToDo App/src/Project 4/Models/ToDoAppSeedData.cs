using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Project_4.Models
{
    public class ToDoAppSeedData
    {
        private ToDoContext _context;
        private UserManager<ToDoUser> _userManager;
        public ToDoAppSeedData(ToDoContext context, UserManager<ToDoUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task SeedData()
        {
            if (await _userManager.FindByNameAsync("onowrouzi") == null)
            {
                var omidUser = new ToDoUser()
                {
                    UserName = "onowrouzi",
                    Email = "onowrouzi@uco.edu"
                };
                IdentityResult x = await _userManager.CreateAsync(omidUser, "AVPfinal1");
            }
            if (!_context.ToDos.Any())
            {
                _context.Add(new ToDo()
                {
                    UserName = "onowrouzi",
                    Name = "Project 1",
                    Description = "Make a site return default api values.",
                    DueDate = new DateTime(2016, 3, 23, 12, 0, 0),
                    WarningDays = 2,
                    WarningHours = 0,
                    Tags = "Work",
                    State = "Completed"
                });
                _context.Add(new ToDo()
                {
                    UserName = "onowrouzi",
                    Name = "Project 2",
                    Description = "Create a personal website with Bootstrap",
                    DueDate = new DateTime(2016, 3, 25, 12, 0, 0),
                    WarningDays = 2,
                    WarningHours = 0,
                    Tags = "School",
                    State = "Active"
                });
                _context.Add(new ToDo()
                {
                    UserName = "onowrouzi",
                    Name = "Project 3",
                    Description = "Learn to use nested views with AngularJS while searching Github using its API.",
                    DueDate = new DateTime(2016, 4, 2, 12, 0, 0),
                    WarningDays = 2,
                    WarningHours = 0,
                    Tags = "Personal,Complicated,New",
                    State = "Active"
                });
                _context.Add(new ToDo()
                {
                    UserName = "onowrouzi",
                    Name = "Project 4",
                    Description = "Create a web api and utilize moment.js to format dates and times.",
                    DueDate = new DateTime(2016, 4, 4, 12, 0, 0),
                    WarningDays = 2,
                    WarningHours = 0,
                    Tags = "School",
                    State = "Active"
                });
                _context.SaveChanges();
            }
        }
    }
}
