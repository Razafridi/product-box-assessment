using Backend.DTO;
using Backend.Model;

namespace Backend.Interface
{
	public interface ICustomerRepository
	{
		public Task AddCustomer(Customer customer);
		public Task UpdateCustomer(Customer customer);
		public Task DeleteCustomer(int customerIds);
		public Task<ICollection<CustomerDTO>> GetAllCustomers();
		//public Task<Customer> GetCustomerById(int id);

	}
}
