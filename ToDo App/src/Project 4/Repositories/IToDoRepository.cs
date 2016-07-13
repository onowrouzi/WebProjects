using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_4.Models;

namespace Project_4.Repositories
{
    public interface IToDoRepository
    {
        void Create(ToDo toDo);

        void Delete(int id);

        void Update(ToDo toDo);

        IEnumerable<ToDo> List();

        ToDo FindById(int id);

        IEnumerable<ToDo> FindBySearchString(string queryString);

    }
}
