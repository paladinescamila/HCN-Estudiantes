using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models.Courses;

namespace Application.Courses
{
  public interface ICourseService
  {
    Task<IEnumerable<Course>> GetCoursesByStudent(string studentId);
  }
}
