using Backend.DTO;
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
        public async  Task<IActionResult> AddCustomer([FromBody] CustomerCreateDTO customer)
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

        [HttpGet]
        public async Task<IActionResult> GetCustomerById([FromQuery] int customerId)
        {
            var res = await customerRepository.GetCustomerById(customerId);
            if(res == null)
            {
                return Ok(new { Success = false, Message = "Customer not found" });
            }
            return Ok(new { Success= true, Data=res});
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer([FromBody]CustomerUpdateDTO customer)
        {
            await customerRepository.UpdateCustomer(customer);
            return Ok(new { Success = true, Message = "Customer Updated Successfully" });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCustomer([FromQuery] int customerId)
        {
            await customerRepository.DeleteCustomer(customerId);
            return Ok(new {Success=true, Message="Deleted Successfully"});
        }
    }
}