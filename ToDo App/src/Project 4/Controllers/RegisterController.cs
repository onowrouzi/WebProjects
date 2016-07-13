using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Project_4.Models;
using Microsoft.Data.Entity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_4.Controllers
{
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private UserManager<ToDoUser> _userManager;
        public RegisterController(UserManager<ToDoUser> userManager)
        {
            _userManager = userManager;
        }

        // POST api/register/userName/email/password
        [HttpPost("{userName}/{email}/{password}")]
        public async Task<int> Post(string userName, string email, string password)
        {
            if (await _userManager.FindByNameAsync(userName) == null)
            {
                if (await _userManager.FindByEmailAsync(email) == null) 
                {
                    var newUser = new ToDoUser()
                    {
                        UserName = userName,
                        Email = email
                    };
                    IdentityResult x = await _userManager.CreateAsync(newUser, password);
                    return 0;
                }
                return 2;
            }
            return 1;
        }
        
    }
}
