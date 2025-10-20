using Backend.Interface;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]/[action]")]
	public class CustomerTypeController : Controller
	{
        private ICustomerTypeRespository customerTypeRepo;
        public CustomerTypeController(ICustomerTypeRespository repo)
        {
            customerTypeRepo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomerType(CustomerType customerType)
        {
            await customerTypeRepo.AddCustomerType(customerType);
            return Ok(new {Success = true, Message="Customer Type Added Successfully"});
        }


		[HttpGet]
		public async Task<IActionResult> GetAllCustomerTypes()
		{
			var res = await customerTypeRepo.GetAllCustomerTypes();
			return Ok(new { Success = true, Data= res });
		}
	}
}
