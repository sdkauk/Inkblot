using Inkblot.BusinessLogic.JournalEntries;
using Inkblot.BusinessLogic.JournalEntries.Requests;
using Inkblot.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inkblot.API.Controllers
{
    [Route("[controller]")]
    public class JournalEntryController : BaseController
    {

        private readonly IJournalEntryService journalEntryService;

        public JournalEntryController(IJournalEntryService journalEntryService)
        {
            this.journalEntryService = journalEntryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JournalEntry>>> Get()
        {
            var userId = GetCurrentUserId();
            var entries = await journalEntryService.GetJournalEntriesByUserAsync(userId);
            return Ok(entries);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<JournalEntry>> Get(Guid id)
        {
            var userId = GetCurrentUserId();
            var entry = await journalEntryService.GetJournalEntryAsync(id, userId);
            return Ok(entry);
        }

        [HttpPost]
        public async Task<ActionResult<JournalEntry>> Post(JournalEntryPostRequest request)
        {
            var userId = GetCurrentUserId();
            var entry = await journalEntryService.CreateJournalEntryAsync(request, userId);
            return CreatedAtAction(nameof(Get), new { id = entry.Id }, entry);
        }

        [HttpPut]
        public async Task<IActionResult> Put(JournalEntryPutRequest request)
        {
            var userId = GetCurrentUserId();
            var entry = await journalEntryService.UpdateJournalEntryAsync(request, userId);
            return Ok(entry);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = GetCurrentUserId();
            await journalEntryService.DeleteJournalEntryAsync(id, userId);
            return NoContent();
        }
    }
}
