using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_4.Models
{
    public class ToDo
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        public string Tags { get; set; }

        public string State { get; set; }

        public int WarningDays { get; set; }

        public int WarningHours { get; set; }

        public IEnumerable<Requirement> Requirements { get; set; }
    }
    
}
