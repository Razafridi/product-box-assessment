using Backend.Interface;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[Route("api/[controller]/[action]")]
	public class CustomerController : Controller
	{
        private ICustomerRepository customerRepository;
        public CustomerController(ICustomerRepository repo)
        {
            customerRepository = repo;
        }

        [HttpPost]
        public async  Task<IActionResult> AddCustomer(Customer customer)
        {
            await customerRepository.AddCustomer(customer);
            return Ok(new { Success = true, Message = "Customer Added Successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var res = await customerRepository.GetAllCustomers();
            return Ok(new {Success= true, Data=res});
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(Customer customer)
        {
            await customerRepository.UpdateCustomer(customer);
            return Ok(new { Success = true, Message = "Customer Updated Successfully" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCustomer([FromBody] int customerId)
        {
            await customerRepository.DeleteCustomer(customerId);
            return Ok(new {Success=true, Message="Deleted Successfully"});
        }
    }
}