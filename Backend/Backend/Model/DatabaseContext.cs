using Microsoft.EntityFrameworkCore;
namespace Backend.Model
{
	public class MyDbContext : DbContext
	{
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
            
        }

        public DbSet<CustomerType> CustomerTypes { get; set; }
		public DbSet<Customer> Customers { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<CustomerType>(e =>
			{
				e.HasKey(c => c.Id);
				e.Property(c => c.Name).IsRequired().HasMaxLength(50);

				e.HasData(
					new CustomerType { Id = 1, Name = "Regular" },
					new CustomerType { Id = 2, Name = "Premium" },
					new CustomerType { Id = 3, Name = "Corporate" }
				);
			});

			modelBuilder.Entity<Customer>(e =>
			{
				e.HasKey(c => c.Id);
				e.Property(c => c.Name).IsRequired().HasMaxLength(50);
				e.Property(c => c.Address).IsRequired().HasMaxLength(50);
				e.Property(c => c.Description).HasMaxLength(1024);
				e.Property(c => c.City).IsRequired().HasMaxLength(50);
				e.Property(c => c.State).IsRequired().HasMaxLength(2);
				e.Property(c => c.Zips).IsRequired().HasMaxLength(10);
				e.Property(c => c.LastUpdated).HasDefaultValueSql("GETDATE()");
			});

			modelBuilder.Entity<Customer>()
				.HasOne(c => c.CustomerType)
				.WithMany(ct => ct.Customers)
				.HasForeignKey(c => c.CustomerTypeId)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Customer>().HasData(
				new Customer
				{
					Id = 1,
					Name = "John Doe",
					Address = "123 Main St",
					City = "NYC",
					State = "NY",
					Zips = "10001",
					Description = "Retail walk-in",
					CustomerTypeId = 1
				},
				new Customer
				{
					Id = 2,
					Name = "Sarah Smith",
					Address = "22 Elm Road",
					City = "Chicago",
					State = "IL",
					Zips = "60601",
					Description = "Regular retail customer",
					CustomerTypeId = 1
				},
				new Customer
				{
					Id = 3,
					Name = "Big Store Inc",
					Address = "45 Market Ave",
					City = "Los Angeles",
					State = "CA",
					Zips = "90001",
					Description = "Wholesale client",
					CustomerTypeId = 2
				},
				new Customer
				{
					Id = 4,
					Name = "VIP Builders LLC",
					Address = "800 King St",
					City = "Dallas",
					State = "TX",
					Zips = "75201",
					Description = "High value VIP customer",
					CustomerTypeId = 3
				},
				new Customer
				{
					Id = 5,
					Name = "City Mart",
					Address = "10 Green Blvd",
					City = "Houston",
					State = "TX",
					Zips = "77001",
					Description = "Wholesale and retail mix",
					CustomerTypeId = 2
				}
			);
		}



	}
}
