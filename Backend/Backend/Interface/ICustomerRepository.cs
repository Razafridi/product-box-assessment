using Backend.DTO;
using Backend.Model;

namespace Backend.Interface
{
	public interface ICustomerRepository
	{
		public Task AddCustomer(CustomerCreateDTO customer);
		public Task UpdateCustomer(CustomerUpdateDTO customer);
		public Task DeleteCustomer(int customerIds);
		public Task<ICollection<CustomerDTO>> GetAllCustomers();
		public Task<CustomerDTO?> GetCustomerById(int id);

	}
}
