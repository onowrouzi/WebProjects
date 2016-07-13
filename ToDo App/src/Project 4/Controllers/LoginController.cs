using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Identity;
using Project_4.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_4.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<ToDoUser> _signInManager;
        public LoginController(SignInManager<ToDoUser> signinManager)
        {
            _signInManager = signinManager;
        }
        // POST: api/login
        [HttpPost]
        public async Task<HttpStatusCodeResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var signinResult = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true, false);
            if (!signinResult.Succeeded)
            {
                return new HttpUnauthorizedResult();
            }
            return new HttpOkResult();
        }
    }
}
