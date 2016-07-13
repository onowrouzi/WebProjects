using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using Project_4.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_4.Controllers
{ 
    [Route("api/[controller]")]
    [Authorize]
    public class ToDoController : Controller
    {
        private IList<ToDo> ToDos;
        private ToDoContext _context;
        private UserManager<ToDoUser> _userManager;
        
        public ToDoController(ToDoContext context, UserManager<ToDoUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            ToDos = _context.ToDos.ToList();
        }

        // GET: api/ToDo
        [HttpGet]
        public async Task<IEnumerable<ToDo>> Get()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userName = user.UserName;
            return (from t in _context.ToDos where t.UserName.Equals(userName) select t); 
        }

        // GET api/ToDo/0
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            JsonResult result = Json(ToDos[id]);
            result.StatusCode = (int) HttpStatusCode.Accepted;
            return result;
        }

        // GET api/todo/search/{queryString}
        [HttpGet("search/{queryString}")]
        public IEnumerable<ToDo> Search(string queryString)
        {
            return (from t in _context.ToDos where t.UserName.Contains(queryString) select t);
        }

        // POST api/ToDo
        [HttpPost]
        public async Task Post([FromBody]ToDo newToDo)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userName = user.UserName;
            newToDo.UserName = userName;
            _context.Add(newToDo);
            _context.SaveChanges();
        }

        // PUT api/ToDo/0
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]ToDo updatedToDo)
        {
            var updateObject = _context.ToDos.First(x => x.Id == id);
            if (updatedToDo.Name!=null) updateObject.Name = updatedToDo.Name;
            if (updatedToDo.Description!=null) updateObject.Description = updatedToDo.Description;
            updateObject.DueDate = updatedToDo.DueDate;
            updateObject.WarningDays = updatedToDo.WarningDays;
            updateObject.WarningHours = updatedToDo.WarningHours;
            if (updatedToDo.Tags!=null) updateObject.Tags = updatedToDo.Tags;
            if (updatedToDo.State!=null) updateObject.State = updatedToDo.State;
            _context.SaveChanges();
        }

        // DELETE api/ToDo/0
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var removeToDo = _context.ToDos.First(x => x.Id == id);
            _context.Remove(removeToDo);
            _context.SaveChanges();
        }
    }
}
