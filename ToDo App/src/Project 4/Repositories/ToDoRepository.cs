using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_4.Models;
using Microsoft.Data.Entity;

namespace Project_4.Repositories
{
    public class ToDoRepository : IToDoRepository
    {
        private ToDoContext _context;

        public ToDoRepository(ToDoContext context)
        {
            _context = context;
        }

        public void Create(ToDo toDo)
        {
            _context.ToDos.Add(toDo);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var toDoToDelete = FindById(id);
            if (toDoToDelete != null)
            {
                _context.ToDos.Remove(toDoToDelete);
                _context.SaveChanges();
            }
        }

        public void Update(ToDo toDo)
        {
            
        }

        public IEnumerable<ToDo> List()
        {
            return _context.ToDos.ToList();
        }

        public ToDo FindById(int id)
        {
            return _context.ToDos.First(t => t.Id == id);
        }

        public IEnumerable<ToDo> FindBySearchString(string queryString)
        {
            return (from t in _context.ToDos.Include(t => t.Requirements) where t.Name.Contains(queryString) select t);
        }
    }
}
